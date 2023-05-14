import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string

  @Field(() => Date)
  birthDate: Date

  @Field(() => String)
  password: string

  @Field(() => String)
  cpf: string

  @Field(() => String)
  email: string

  @Field(() => String)
  phone: string
}
