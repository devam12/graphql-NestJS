import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Member } from '../models/Member';
import { mockMember } from 'src/__mocks__/mockMember';
import { mockMemberSettings } from 'src/__mocks__/mockMemberSettings';
import { createMemberType } from '../type/createMemberType';
import { MemberSettings } from '../models/MemberSettings';
import { MemberService } from './member.service';
export let currentId = 3;

@Resolver((of) => Member)
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Query((returns) => Member, { nullable: true })
  getMemberById(@Args('id', { type: () => Int }) id: number) {
    return this.memberService.getMemberById(id);
  }

  @Query((returns) => [Member], { nullable: true })
  getMembers() {
    return this.memberService.getMember();
  }

  @ResolveField((returns) => MemberSettings, {
    nullable: true,
    name: 'settings',
  })
  getMemberSetting(@Parent() member: Member) {
    return mockMemberSettings.find((setting) => setting.userId === member.id);
  }

  @Mutation((returns) => Member, { nullable: true })
  createMember(
    // @Args('username') username: string,
    // @Args('displayName', { nullable: true }) displayName: string,
    @Args('createMemberData') createMemberData: createMemberType,
  ) {
    const { username, displayName } = createMemberData;
    const memberObj = { id: ++currentId, username, displayName };
    return this.memberService.createMember(memberObj);
  }
}
