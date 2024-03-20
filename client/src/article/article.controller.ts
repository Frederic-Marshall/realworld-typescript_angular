import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorators/user.decorator";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { userEntity } from "@app/user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";
import { BackendValidationPipe } from "@app/shared/pipes/backendValidation.pipe";

@Controller('articles')
export class ArticleController {

	constructor(private readonly articleService: ArticleService) {}

	@Get()
	async findAll(
		@User('id') currentUserId: number,
		@Query() query: any,
	): Promise<ArticlesResponseInterface> {
		return await this.articleService.findAll(currentUserId, query)
	}

	@Get('feed')
	@UseGuards(AuthGuard)
	async getFeed(
		@User('id') currentUserId: number,
		@Query() query: any,
	): Promise<ArticlesResponseInterface> {
		return this.articleService.getFeed(
			currentUserId,
			query,
		)
	}

	@Post()
	@UsePipes(new BackendValidationPipe())
	@UseGuards(AuthGuard)
	async create(
		@User() currentUser: userEntity, 
		@Body('article') createArticleDto: CreateArticleDto
	): Promise<ArticleResponseInterface> {
		const article = await this.articleService.createArticle(
			currentUser,
			createArticleDto
		); 

		return this.articleService.buildArticleResponse(article);
	}

	@Get(':slug')
	async getSingleArticle(
		@Param('slug') slug: string
	):Promise<ArticleResponseInterface> {
		const article = await this.articleService.findBySlug(slug);

		return this.articleService.buildArticleResponse(article);
	}

	@Put(':slug')
	@UsePipes(new BackendValidationPipe())
	@UseGuards(AuthGuard)
	async updateArticle(
		@User('id') currentUserId: number,
		@Param('slug') slug: string,
		@Body('article') updateArticleDto: CreateArticleDto,
	): Promise<ArticleResponseInterface> {
		const article = await this.articleService.updateArticle(
			currentUserId,
			slug,
			updateArticleDto,
		);
		return this.articleService.buildArticleResponse(article);
	}

	@Delete(':slug')
	@UseGuards(AuthGuard)
	async deleteArticle(
		@User('id') currentUserId: number, 
		@Param('slug') slug: string
	) {
		return await this.articleService.deleteArticle(
			slug, 
			currentUserId
		);
	}

	@Post(':slug/favorite')
	@UseGuards(AuthGuard)
	async addArticleToFavorites(
		@User('id') currentUserId:number,
		@Param('slug') slug: string
	): Promise<ArticleResponseInterface> {
		const article = await this.articleService.addArticleToFavorites(
			slug,
			currentUserId
		);

		return await this.articleService.buildArticleResponse(article);
	}

	@Delete(':slug/favorite')
	@UseGuards(AuthGuard)
	async deleteArticleFromFavorites(
		@User('id') currentUserId:number,
		@Param('slug') slug: string
	): Promise<ArticleResponseInterface> {
		const article = await this.articleService.deleteArticleFromFavorites(
			slug,
			currentUserId
		);

		return await this.articleService.buildArticleResponse(article);
	}
}