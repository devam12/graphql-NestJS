import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'member_setting' })
@ObjectType()
export class MemberSettings {
  @PrimaryColumn()
  @Field((type) => Int, { nullable: true })
  userId: number;

  @Column()
  @Field({ defaultValue: false })
  receiveNotofications: boolean;

  @Column()
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
