// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class HSI__shareResultStakeStruct extends ethereum.Tuple {
  get stakeId(): BigInt {
    return this[0].toBigInt();
  }

  get stakeShares(): BigInt {
    return this[1].toBigInt();
  }

  get lockedDay(): i32 {
    return this[2].toI32();
  }

  get stakedDays(): i32 {
    return this[3].toI32();
  }
}

export class HSI__shareResult {
  value0: HSI__shareResultStakeStruct;
  value1: i32;
  value2: i32;
  value3: i32;
  value4: i32;
  value5: BigInt;
  value6: i32;
  value7: boolean;

  constructor(
    value0: HSI__shareResultStakeStruct,
    value1: i32,
    value2: i32,
    value3: i32,
    value4: i32,
    value5: BigInt,
    value6: i32,
    value7: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromTuple(this.value0));
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    map.set(
      "value3",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value3))
    );
    map.set(
      "value4",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value4))
    );
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set(
      "value6",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value6))
    );
    map.set("value7", ethereum.Value.fromBoolean(this.value7));
    return map;
  }

  getStake(): HSI__shareResultStakeStruct {
    return this.value0;
  }

  getMintedDays(): i32 {
    return this.value1;
  }

  getLaunchBonus(): i32 {
    return this.value2;
  }

  getLoanStart(): i32 {
    return this.value3;
  }

  getLoanedDays(): i32 {
    return this.value4;
  }

  getInterestRate(): BigInt {
    return this.value5;
  }

  getPaymentsMade(): i32 {
    return this.value6;
  }

  getIsLoaned(): boolean {
    return this.value7;
  }
}

export class HSI__stakeDataFetchResultValue0Struct extends ethereum.Tuple {
  get stakeId(): BigInt {
    return this[0].toBigInt();
  }

  get stakedHearts(): BigInt {
    return this[1].toBigInt();
  }

  get stakeShares(): BigInt {
    return this[2].toBigInt();
  }

  get lockedDay(): i32 {
    return this[3].toI32();
  }

  get stakedDays(): i32 {
    return this[4].toI32();
  }

  get unlockedDay(): i32 {
    return this[5].toI32();
  }

  get isAutoStake(): boolean {
    return this[6].toBoolean();
  }
}

export class HSI extends ethereum.SmartContract {
  static bind(address: Address): HSI {
    return new HSI("HSI", address);
  }

  share(): HSI__shareResult {
    let result = super.call(
      "share",
      "share():((uint40,uint72,uint16,uint16),uint16,uint8,uint16,uint16,uint32,uint8,bool)",
      []
    );

    return changetype<HSI__shareResult>(
      new HSI__shareResult(
        changetype<HSI__shareResultStakeStruct>(result[0].toTuple()),
        result[1].toI32(),
        result[2].toI32(),
        result[3].toI32(),
        result[4].toI32(),
        result[5].toBigInt(),
        result[6].toI32(),
        result[7].toBoolean()
      )
    );
  }

  try_share(): ethereum.CallResult<HSI__shareResult> {
    let result = super.tryCall(
      "share",
      "share():((uint40,uint72,uint16,uint16),uint16,uint8,uint16,uint16,uint32,uint8,bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<HSI__shareResult>(
        new HSI__shareResult(
          changetype<HSI__shareResultStakeStruct>(value[0].toTuple()),
          value[1].toI32(),
          value[2].toI32(),
          value[3].toI32(),
          value[4].toI32(),
          value[5].toBigInt(),
          value[6].toI32(),
          value[7].toBoolean()
        )
      )
    );
  }

  stakeDataFetch(): HSI__stakeDataFetchResultValue0Struct {
    let result = super.call(
      "stakeDataFetch",
      "stakeDataFetch():((uint40,uint72,uint72,uint16,uint16,uint16,bool))",
      []
    );

    return changetype<HSI__stakeDataFetchResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_stakeDataFetch(): ethereum.CallResult<
    HSI__stakeDataFetchResultValue0Struct
  > {
    let result = super.tryCall(
      "stakeDataFetch",
      "stakeDataFetch():((uint40,uint72,uint72,uint16,uint16,uint16,bool))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<HSI__stakeDataFetchResultValue0Struct>(value[0].toTuple())
    );
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get stakeLength(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }
}

export class DestroyCall extends ethereum.Call {
  get inputs(): DestroyCall__Inputs {
    return new DestroyCall__Inputs(this);
  }

  get outputs(): DestroyCall__Outputs {
    return new DestroyCall__Outputs(this);
  }
}

export class DestroyCall__Inputs {
  _call: DestroyCall;

  constructor(call: DestroyCall) {
    this._call = call;
  }
}

export class DestroyCall__Outputs {
  _call: DestroyCall;

  constructor(call: DestroyCall) {
    this._call = call;
  }
}

export class GoodAccountingCall extends ethereum.Call {
  get inputs(): GoodAccountingCall__Inputs {
    return new GoodAccountingCall__Inputs(this);
  }

  get outputs(): GoodAccountingCall__Outputs {
    return new GoodAccountingCall__Outputs(this);
  }
}

export class GoodAccountingCall__Inputs {
  _call: GoodAccountingCall;

  constructor(call: GoodAccountingCall) {
    this._call = call;
  }
}

export class GoodAccountingCall__Outputs {
  _call: GoodAccountingCall;

  constructor(call: GoodAccountingCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get hexAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class UpdateCall extends ethereum.Call {
  get inputs(): UpdateCall__Inputs {
    return new UpdateCall__Inputs(this);
  }

  get outputs(): UpdateCall__Outputs {
    return new UpdateCall__Outputs(this);
  }
}

export class UpdateCall__Inputs {
  _call: UpdateCall;

  constructor(call: UpdateCall) {
    this._call = call;
  }

  get _share(): UpdateCall_shareStruct {
    return changetype<UpdateCall_shareStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class UpdateCall__Outputs {
  _call: UpdateCall;

  constructor(call: UpdateCall) {
    this._call = call;
  }
}

export class UpdateCall_shareStruct extends ethereum.Tuple {
  get _stake(): UpdateCall_share_stakeStruct {
    return changetype<UpdateCall_share_stakeStruct>(this[0].toTuple());
  }

  get _mintedDays(): BigInt {
    return this[1].toBigInt();
  }

  get _launchBonus(): BigInt {
    return this[2].toBigInt();
  }

  get _loanStart(): BigInt {
    return this[3].toBigInt();
  }

  get _loanedDays(): BigInt {
    return this[4].toBigInt();
  }

  get _interestRate(): BigInt {
    return this[5].toBigInt();
  }

  get _paymentsMade(): BigInt {
    return this[6].toBigInt();
  }

  get _isLoaned(): boolean {
    return this[7].toBoolean();
  }
}

export class UpdateCall_share_stakeStruct extends ethereum.Tuple {
  get stakeId(): BigInt {
    return this[0].toBigInt();
  }

  get stakeShares(): BigInt {
    return this[1].toBigInt();
  }

  get lockedDay(): i32 {
    return this[2].toI32();
  }

  get stakedDays(): i32 {
    return this[3].toI32();
  }
}
