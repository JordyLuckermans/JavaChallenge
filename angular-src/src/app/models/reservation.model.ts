export class Reservation {
  constructor(
    public room:String,
    public user:String,
    public starttime:Date,
    public endtime:Date,
    public motivation:String,
    public status:String,
    public comment:String
  ){}
}
