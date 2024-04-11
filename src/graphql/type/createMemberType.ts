import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createMemberType {
  @Field()
  username: string;

  @Field()
  displayName: string;
}
