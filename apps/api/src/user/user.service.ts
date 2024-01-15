import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly walletService: WalletService,
  ) {}

  async findUserByUsername(username: User['username']) {
    return this.prisma.user.findUnique({ where: { username } });
  }
  async findUserById(id: User['id']) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async registerUser(username: string, password: string) {
    const newUser = await this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
    await this.walletService.generateWallets(newUser.id);
  }
}
