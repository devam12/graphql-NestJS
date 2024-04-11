import { Module } from '@nestjs/common';
import { MemberSettingResolver } from './MemberSettingResolver';
import { MemberSettings } from '../models/MemberSettings';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberSettingService } from './memberSetting.service';
import { MemberService } from '../Member/member.service';
import { Member } from '../models/Member';

@Module({
  imports: [TypeOrmModule.forFeature([MemberSettings, Member])],
  providers: [MemberSettingResolver, MemberSettingService],
})
export class MemberSettingModule {}
