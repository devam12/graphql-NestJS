import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberSettings } from '../models/MemberSettings';
import { createMemberSettingType } from '../type/createMemberSetting';
import { Member } from '../models/Member';

@Injectable()
export class MemberSettingService {
  constructor(
    @InjectRepository(MemberSettings)
    private memberSettingRepository: Repository<MemberSettings>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  getMemberSetting() {
    return this.memberSettingRepository.find({});
  }

  async createMemberSetting(memberSettingObj: createMemberSettingType) {
    const memberObj = await this.memberRepository.findOneBy({
      id: memberSettingObj.userId,
    });
    if (memberObj) {
      const newMemberSetting =
        this.memberSettingRepository.create(memberSettingObj);
      memberObj.settings = newMemberSetting;
      this.memberRepository.save(memberObj);
      return this.memberSettingRepository.save(newMemberSetting);
    }
    return {};
  }

  getMemberSettingById(id: number) {
    return this.memberSettingRepository.findOneBy({ userId: id });
  }
}
