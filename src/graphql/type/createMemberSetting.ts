import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class createMemberSettingType {
  @Field((type) => Int)
  userId: number;

  @Field()
  receiveNotofications: boolean;

  @Field()
  receiveEmails: boolean;
}
