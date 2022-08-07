export default class HttpResponse<T> {
  constructor(
    public statusCode: number,
    public body: {
      message: string
      error: string
      data?: T
    }
  ) { }
}
