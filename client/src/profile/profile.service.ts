import {
	Injectable,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ProfileType } from "./types/profile.type";
import { ProfileResponseInterface } from "./types/profileResponse.interface";
import { userEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FollowEntity } from "./follow.entity";

@Injectable()
export class ProfileService {

	constructor(
		@InjectRepository(userEntity)
		private readonly userRepository: Repository<userEntity>,

		@InjectRepository(FollowEntity)
		private readonly followRepository: Repository<FollowEntity>
	) {}

	async getProfile(
		currentUserId: number,
		profileUsername: string,
	): Promise<ProfileType> {
		const user = await this.userRepository.findOne({
			username: profileUsername,
		});

		if (!user) {
			throw new HttpException(
				'Profile does not exist',
				HttpStatus.NOT_FOUND
			);
		}

		const follow = await this.followRepository.findOne({
			followerId: currentUserId, 
			followingId: user.id
		});
		
		return { ...user, following: Boolean(follow) };
	}

	async followProfile(
		currentUserId: number,
		profileUsername: string,
	): Promise<ProfileType> {
		const user = await this.userRepository.findOne({
			username: profileUsername,
		});

		if (!user) {
			throw new HttpException(
				'Profile does not exist',
				HttpStatus.NOT_FOUND
			);
		}

		if (currentUserId === user.id) {
			throw new HttpException(
				'You cannot follow yourself',
				HttpStatus.BAD_REQUEST
			);
		}

		const follow = await this.followRepository.findOne({
			followerId: currentUserId, 
			followingId: user.id
		});

		if (!follow) {
			const followToCreate = new FollowEntity()
			followToCreate.followerId = currentUserId;
			followToCreate.followingId = user.id;
			await this.followRepository.save(followToCreate)
		}

		return { ...user, following: true};
	}

	async unfollowProfile(
		currentUserId: number,
		profileUsername: string,
	): Promise<ProfileType>{
		const user = await this.userRepository.findOne({
			username: profileUsername,
		});

		if (!user) {
			throw new HttpException(
				'Profile does not exist',
				HttpStatus.NOT_FOUND
			);
		}

		if (currentUserId === user.id) {
			throw new HttpException(
				'You cannot follow yourself',
				HttpStatus.BAD_REQUEST
			);
		}

		await this.followRepository.delete({
			followerId: currentUserId,
			followingId: user.id,
		});

		return { ...user, following: false };
	}

	buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
		delete profile.email;
		return { profile };
	}
}