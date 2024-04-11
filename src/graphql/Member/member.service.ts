import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../models/Member';
import { createMemberType } from '../type/createMemberType';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  getMember() {
    return this.memberRepository.find({});
  }

  createMember(memberObj: createMemberType) {
    const newMember = this.memberRepository.create(memberObj);
    return this.memberRepository.save(newMember);
  }

  getMemberById(id: number) {
    return this.memberRepository.findOneBy({ id });
  }
}
