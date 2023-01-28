"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const binary_install_raw_1 = require("binary-install-raw");
const chalk_1 = __importDefault(require("chalk"));
const gluegun_1 = require("gluegun");
const js_yaml_1 = __importDefault(require("js-yaml"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const semver_1 = __importDefault(require("semver"));
const gluegun_2 = require("../command-helpers/gluegun");
const HELP = `
${chalk_1.default.bold('graph test')} ${chalk_1.default.dim('[options]')} ${chalk_1.default.bold('<datasource>')}

${chalk_1.default.dim('Options:')}
  -c, --coverage                Run the tests in coverage mode
  -d, --docker                  Run the tests in a docker container(Note: Please execute from the root folder of the subgraph)
  -f  --force                   Binary - overwrites folder + file when downloading. Docker - rebuilds the docker image
  -h, --help                    Show usage information
  -l, --logs                    Logs to the console information about the OS, CPU model and download url (debugging purposes)
  -r, --recompile               Force-recompile tests
  -v, --version <tag>           Choose the version of the rust binary that you want to be downloaded/used
  `;
exports.default = {
    description: 'Runs rust binary for subgraph testing',
    run: async (toolbox) => {
        // Read CLI parameters
        const { c, coverage, d, docker, f, force, h, help, l, logs, r, recompile, v, version } = toolbox.parameters.options;
        const testsFolder = './tests';
        const opts = {
            testsFolder,
            cachePath: path_1.default.join(testsFolder, '.latest.json'),
        };
        // Support both long and short option variants
        opts.coverage = coverage || c;
        opts.docker = docker || d;
        opts.force = force || f;
        opts.help = help || h;
        opts.logs = logs || l;
        opts.recompile = recompile || r;
        opts.version = version || v;
        // Fix if a boolean flag (e.g -c, --coverage) has an argument
        try {
            (0, gluegun_2.fixParameters)(toolbox.parameters, {
                h,
                help,
                c,
                coverage,
                d,
                docker,
                f,
                force,
                l,
                logs,
                r,
                recompile,
            });
        }
        catch (e) {
            gluegun_1.print.error(e.message);
            process.exitCode = 1;
            return;
        }
        const datasource = toolbox.parameters.first || toolbox.parameters.array?.[0];
        // Show help text if requested
        if (opts.help) {
            gluegun_1.print.info(HELP);
            return;
        }
        // Check if matchstick.yaml config exists
        if (gluegun_1.filesystem.exists('matchstick.yaml')) {
            try {
                // Load the config
                const config = await js_yaml_1.default.load(gluegun_1.filesystem.read('matchstick.yaml', 'utf8'));
                // Check if matchstick.yaml and testsFolder not null
                if (config?.testsFolder) {
                    // assign test folder from matchstick.yaml if present
                    opts.testsFolder = config.testsFolder;
                }
            }
            catch (error) {
                gluegun_1.print.info('A problem occurred while reading matchstick.yaml. Please attend to the errors below:');
                gluegun_1.print.error(error.message);
                process.exit(1);
            }
        }
        setVersionFromCache(opts);
        // Fetch the latest version tag if version is not specified with -v/--version or if the version is not cached
        if (opts.force || (!opts.version && !opts.latestVersion)) {
            gluegun_1.print.info('Fetching latest version tag');
            const result = await (0, node_fetch_1.default)('https://api.github.com/repos/LimeChain/matchstick/releases/latest');
            const json = await result.json();
            opts.latestVersion = json.tag_name;
            gluegun_1.filesystem.file(opts.cachePath, {
                content: {
                    version: json.tag_name,
                    timestamp: Date.now(),
                },
            });
        }
        if (opts.docker) {
            runDocker(datasource, opts);
        }
        else {
            runBinary(datasource, opts);
        }
    },
};
async function setVersionFromCache(opts) {
    if (gluegun_1.filesystem.exists(opts.cachePath) == 'file') {
        const cached = gluegun_1.filesystem.read(opts.cachePath, 'json');
        // Get the cache age in days
        const cacheAge = (Date.now() - cached.timestamp) / (1000 * 60 * 60 * 24);
        // If cache age is less than 1 day, use the cached version
        if (cacheAge < 1) {
            opts.latestVersion = cached.version;
        }
    }
}
async function runBinary(datasource, opts) {
    const coverageOpt = opts.coverage;
    const forceOpt = opts.force;
    const logsOpt = opts.logs;
    const versionOpt = opts.version;
    const latestVersion = opts.latestVersion;
    const recompileOpt = opts.recompile;
    const platform = await getPlatform(logsOpt);
    const url = `https://github.com/LimeChain/matchstick/releases/download/${versionOpt || latestVersion}/${platform}`;
    if (logsOpt) {
        gluegun_1.print.info(`Download link: ${url}`);
    }
    const binary = new binary_install_raw_1.Binary(platform, url, versionOpt || latestVersion);
    forceOpt ? await binary.install(true) : await binary.install(false);
    const args = [];
    if (coverageOpt)
        args.push('-c');
    if (recompileOpt)
        args.push('-r');
    if (datasource)
        args.push(datasource);
    args.length > 0 ? binary.run(...args) : binary.run();
}
async function getPlatform(logsOpt) {
    const type = os_1.default.type();
    const arch = os_1.default.arch();
    const cpuCore = os_1.default.cpus()[0];
    const isAppleSilicon = arch === 'arm64' && /Apple (M1|M2|processor)/.test(cpuCore.model);
    const linuxInfo = type === 'Linux' ? await getLinuxInfo() : {};
    const linuxDistro = linuxInfo.name;
    const release = linuxInfo.version || os_1.default.release();
    const majorVersion = parseInt(linuxInfo.version || '', 10) || semver_1.default.major(release);
    if (logsOpt) {
        gluegun_1.print.info(`OS type: ${linuxDistro || type}\nOS arch: ${arch}\nOS release: ${release}\nOS major version: ${majorVersion}\nCPU model: ${cpuCore.model}`);
    }
    if (arch === 'x64' || isAppleSilicon) {
        if (type === 'Darwin') {
            if (majorVersion === 18 || majorVersion === 19) {
                return 'binary-macos-10.15'; // GitHub dropped support for macOS 10.14 in Actions, but it seems 10.15 binary works on 10.14 too
            }
            if (isAppleSilicon) {
                return 'binary-macos-11-m1';
            }
            return 'binary-macos-11';
        }
        if (type === 'Linux') {
            if (majorVersion === 18) {
                return 'binary-linux-18';
            }
            if (majorVersion === 22) {
                return 'binary-linux-22';
            }
            return 'binary-linux-20';
        }
    }
    throw new Error(`Unsupported platform: ${type} ${arch} ${majorVersion}`);
}
async function getLinuxInfo() {
    try {
        const result = await gluegun_1.system.run("cat /etc/*-release | grep -E '(^VERSION|^NAME)='", {
            trim: true,
        });
        const infoArray = result
            .replace(/['"]+/g, '')
            .split('\n')
            .map(p => p.split('='));
        const linuxInfo = {};
        infoArray.forEach(val => {
            linuxInfo[val[0].toLowerCase()] = val[1];
        });
        return linuxInfo;
    }
    catch (error) {
        gluegun_1.print.error(`Error fetching the Linux version:\n ${error}`);
        process.exit(1);
    }
}
async function runDocker(datasource, opts) {
    const coverageOpt = opts.coverage;
    const forceOpt = opts.force;
    const versionOpt = opts.version;
    const latestVersion = opts.latestVersion;
    const recompileOpt = opts.recompile;
    // Remove binary-install-raw binaries, because docker has permission issues
    // when building the docker images
    gluegun_1.filesystem.remove('./node_modules/binary-install-raw/bin');
    // Get current working directory
    const current_folder = gluegun_1.filesystem.cwd();
    // Declate dockerfilePath with default location
    const dockerfilePath = path_1.default.join(opts.testsFolder || 'tests', '.docker/Dockerfile');
    // Check if the Dockerfil already exists
    const dockerfileExists = gluegun_1.filesystem.exists(dockerfilePath);
    // Generate the Dockerfile only if it doesn't exists,
    // version flag and/or force flag is passed.
    if (!dockerfileExists || versionOpt || forceOpt) {
        await dockerfile(dockerfilePath, versionOpt, latestVersion);
    }
    // Run a command to check if matchstick image already exists
    (0, child_process_1.exec)('docker images -q matchstick', (_error, stdout, _stderr) => {
        // Collect all(if any) flags and options that have to be passed to the matchstick binary
        let testArgs = '';
        if (coverageOpt)
            testArgs = testArgs + ' -c';
        if (recompileOpt)
            testArgs = testArgs + ' -r';
        if (datasource)
            testArgs = testArgs + ' ' + datasource;
        // Build the `docker run` command options and flags
        const dockerRunOpts = [
            'run',
            '-it',
            '--rm',
            '--mount',
            `type=bind,source=${current_folder},target=/matchstick`,
        ];
        if (testArgs !== '') {
            dockerRunOpts.push('-e');
            dockerRunOpts.push(`ARGS=${testArgs.trim()}`);
        }
        dockerRunOpts.push('matchstick');
        // If a matchstick image does not exists, the command returns an empty string,
        // else it'll return the image ID. Skip `docker build` if an image already exists
        // Delete current image(if any) and rebuild.
        // Use spawn() and {stdio: 'inherit'} so we can see the logs in real time.
        if (!dockerfileExists || stdout === '' || versionOpt || forceOpt) {
            if (stdout !== '') {
                (0, child_process_1.exec)('docker image rm matchstick', (_error, stdout, _stderr) => {
                    gluegun_1.print.info(chalk_1.default.bold(`Removing matchstick image\n${stdout}`));
                });
            }
            // Build a docker image. If the process has executed successfully
            // run a container from that image.
            (0, child_process_1.spawn)('docker', ['build', '-f', dockerfilePath, '-t', 'matchstick', '.'], {
                stdio: 'inherit',
            }).on('close', code => {
                if (code === 0) {
                    (0, child_process_1.spawn)('docker', dockerRunOpts, { stdio: 'inherit' });
                }
            });
        }
        else {
            gluegun_1.print.info('Docker image already exists. Skipping `docker build` command.');
            // Run the container from the existing matchstick docker image
            (0, child_process_1.spawn)('docker', dockerRunOpts, { stdio: 'inherit' });
        }
    });
}
// Downloads Dockerfile template from the demo-subgraph repo
// Replaces the placeholders with their respective values
async function dockerfile(dockerfilePath, versionOpt, latestVersion) {
    const spinner = gluegun_1.print.spin('Generating Dockerfile...');
    try {
        // Fetch the Dockerfile template content from the demo-subgraph repo
        const content = await (0, node_fetch_1.default)('https://raw.githubusercontent.com/LimeChain/demo-subgraph/main/Dockerfile').then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error(`Status Code: ${response.status}, with error: ${response.statusText}`);
        });
        // Write the Dockerfile
        gluegun_1.filesystem.write(dockerfilePath, content);
        // Replaces the version placeholders
        await gluegun_1.patching.replace(dockerfilePath, '<MATCHSTICK_VERSION>', versionOpt || latestVersion || 'unknown');
    }
    catch (error) {
        spinner.fail(`A problem occurred while generating the Dockerfile. Please attend to the errors below:\n ${error.message}`);
        process.exit(1);
    }
    spinner.succeed('Successfully generated Dockerfile.');
}
