import { Module } from '@nestjs/common';
import { MemberResolver } from 'src/graphql/Member/MemberResolver';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../models/Member';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberResolver, MemberService],
})
export class MemberModule {}
