import { AppDataSource } from "../config/database";
import { UserDto } from "../dto/userDto";
import { User } from "../entities/Parent";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { RefreshToken } from "../entities/refreshToken";


export class UserService{
    private userRepository = AppDataSource.getRepository(User);
    private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);


    async register (userDto: UserDto){
        const { email , username , password , confirmationPassword } = userDto;

        const userExisting = await this.userRepository.findOneBy({email});

        if (userExisting) {
            throw new Error('user Already existe');
        }

        if (password !== confirmationPassword) {
            throw new Error('Password not match');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            username,
            password: hashPassword,
        });

        await this.userRepository.save(user);
        const {password:_, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }

    async login (email: string , password: string){
        const user = await this.userRepository.findOneBy({email});

        if (!user) {
            throw new Error('user not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('password not match');
        }

        const accessTokenValue = generateAccessToken({id: user.id , username: user.username , email: user.email });
        const refreshTokenValue = generateRefreshToken({id: user.id , username: user.username , email: user.email });

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        const refreshToken = this.refreshTokenRepository.create({
            token: refreshTokenValue,
            expires_in: expires,
            user,
        });
        await this.refreshTokenRepository.save(refreshToken);

        const {password:_, ...userWithoutPassword} = user;

        return {user , accessToken: accessTokenValue , refreshToken: refreshTokenValue};
    }

    async refreshToken(token: string){
        const tokenRecord = await this.refreshTokenRepository.findOne({where: {token}, relations: ['user']});
        if (!tokenRecord) {
            throw new Error('refresh token invalid');
        }

        try {
            const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;
            await this.refreshTokenRepository.delete({token: tokenRecord.token});

            if (decode) {
                const newAccessToken = generateAccessToken({id: decode.id , username: decode.username , email: decode.email });
                const newRefreshToken = generateRefreshToken({id: decode.id , username: decode.username , email: decode.email});

                const refreshToken = this.refreshTokenRepository.create({
                    token: newRefreshToken,
                    expires_in: new Date(),
                    user: tokenRecord.user,
                });
                await this.refreshTokenRepository.save(refreshToken);

                return {accessToken: newAccessToken , refreshToken: newRefreshToken};


            }

        } catch (error) {
            throw new Error("Invalid token");
        }

    }

    async logout(userId: number){
        await this.refreshTokenRepository.delete({user: {id: userId}});
        return true;
    }

    async findAll(){
        const users = await this.userRepository.find({
            order: {
                isActive: 'DESC'
            }
        });
        return users;
    }

    async findOne(id: number){
        const user = await this.userRepository.findOneBy({id});
        return user;
    }

    async update(id: number , userDto: UserDto){
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new Error('user not found');
        }

        Object.assign(user, userDto);
        await this.userRepository.save(user);
        return user;
    
    }
    
    
}