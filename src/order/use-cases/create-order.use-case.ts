import { OrderOutput } from '../dto';

export class CreateOrderUseCase {
  execute({ exampleField }: Input): Output {
    return { exampleField };
  }
}

type Input = { exampleField: number };
type Output = OrderOutput;
