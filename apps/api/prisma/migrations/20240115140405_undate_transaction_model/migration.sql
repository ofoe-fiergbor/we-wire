/*
  Warnings:

  - You are about to drop the column `transaction_credit_wallet_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_debit_currency` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_debit_wallet_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transaction_credit_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transaction_debit_wallet_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transaction_credit_wallet_id",
DROP COLUMN "transaction_debit_currency",
DROP COLUMN "transaction_debit_wallet_id",
ADD COLUMN     "currency" "supported_currencies" NOT NULL,
ADD COLUMN     "type" "TransactionType" NOT NULL,
ADD COLUMN     "wallet_id" TEXT NOT NULL,
ALTER COLUMN "transaction_fee" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
