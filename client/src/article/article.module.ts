import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { userEntity } from '@app/user/user.entity';
import { FollowEntity } from '@app/profile/follow.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ArticleEntity, userEntity, FollowEntity])],
	controllers: [ArticleController],
	providers: [ArticleService]
})

export class ArticleModule {}