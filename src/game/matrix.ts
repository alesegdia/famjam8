class Matrix<T> {
  data    : T[]
  width   : number
  height  : number
  constructor(width: number, height: number, data?:T[]) {
    this.width = width;
    this.height = height;
    if( data ) {
      this.data = data;
      if( this.data.length != width * height ) {
        throw new Error("Provided data doesn't fit size");
      }
    } else {
      this.fill(null);
    }
  }

  public get cols() {
    return this.width;
  }

  public get rows() {
    return this.height;
  }

  public fill(value: T) {
    this.data = [];
    for( var i = 0; i < this.width * this.height; i++ ) {
      this.data.push(value);
    }
  }

  private assertAccess(col: number, row: number) {
    if( col < 0 && col >= this.width &&
        row < 0 && row >= this.height ) {
      throw Error("wrong index");
    }
  }

  private coordToIndex(col: number, row: number): number {
    return row * this.width + col;
  }

  public get(col: number, row: number) {
    this.assertAccess(col, row);
    return this.data[this.coordToIndex(col, row)];
  }

  public set(col: number, row: number, value: T) {
    this.assertAccess(col, row);
    this.data[this.coordToIndex(col, row)] = value;
  }
}
