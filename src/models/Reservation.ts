import dayjs from "dayjs";

export interface Reservation {
  id: string
  tableId: string
  dateTime: dayjs.Dayjs | Date
  customerName: string
  customerPhone: string
  customerEmail: string
}