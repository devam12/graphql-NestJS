import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';
import { Post } from './typeorm/entities/Post';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MemberResolver } from './graphql/Member/MemberResolver';
import { MemberSettingResolver } from './graphql/MemberSettings/MemberSettingResolver';
import { Member } from './graphql/models/Member';
import { MemberSettings } from './graphql/models/MemberSettings';
import { MemberModule } from './graphql/Member/Member.module';
import { MemberSettingModule } from './graphql/MemberSettings/MemberSetting.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abhiyaan',
      database: 'demo',
      entities: [User, Profile, Post, Member, MemberSettings],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    MemberModule,
    MemberSettingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
