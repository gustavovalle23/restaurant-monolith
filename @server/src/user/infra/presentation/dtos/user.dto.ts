import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  name: string

  @Field(() => Date)
  birthDate: Date

  @Field(() => Boolean)
  active: boolean

  @Field(() => String)
  password: string

  @Field(() => String)
  cpf: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date, { nullable: true })
  deletedAt?: Date

  @Field(() => Date)
  createdAt: Date

}
