
export type ApplicationErrorConfig<T> = {
  body: { message?: string },
  data?: T
}

export const DEFAULT_APPLICATION_ERROR_CONFIG: ApplicationErrorConfig<void> = {
  body: { message: 'Por favor, tente novamente após alguns minutos.' },
}

export class ApplicationError<T> extends Error {
  statusCode: number
  constructor(
    public validation: ApplicationErrorConfig<T>
  ) {
    super(validation.body.message || DEFAULT_APPLICATION_ERROR_CONFIG.body.message)
  }
}
