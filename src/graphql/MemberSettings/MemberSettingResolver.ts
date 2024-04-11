import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { createMemberSettingType } from '../type/createMemberSetting';
import { MemberSettings } from '../models/MemberSettings';
import { MemberSettingService } from './memberSetting.service';

export let currentId = 3;

@Resolver()
export class MemberSettingResolver {
  constructor(private memberSettingService: MemberSettingService) {}

  @Mutation((returns) => MemberSettings)
  createMemberSetting(
    @Args('setting') createSettingData: createMemberSettingType,
  ) {
    const { userId, receiveNotofications, receiveEmails } = createSettingData;
    const memberSettingObj = {
      receiveNotofications,
      receiveEmails,
      userId,
    };
    return this.memberSettingService.createMemberSetting(memberSettingObj);
    // mockMemberSettings.push(memberSettingObj);
    // return memberSettingObj;
  }
}
