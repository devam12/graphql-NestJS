import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { MemberSettings } from './MemberSettings';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Members' })
@ObjectType()
export class Member {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => MemberSettings)
  @JoinColumn()
  @Field({ nullable: true })
  settings: MemberSettings;
}
