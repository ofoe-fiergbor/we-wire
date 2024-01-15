-- CreateEnum
CREATE TYPE "supported_currencies" AS ENUM ('NGN', 'GHS', 'USD', 'KES', 'EUR');

-- CreateEnum
CREATE TYPE "transaction_types" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(40) NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" VARCHAR(40) NOT NULL,
    "wallet_ballance" DOUBLE PRECISION NOT NULL,
    "currency" "supported_currencies" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(40) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" VARCHAR(40) NOT NULL,
    "transaction_amount" DOUBLE PRECISION NOT NULL,
    "transaction_debit_currency" "supported_currencies" NOT NULL,
    "transaction_fee" DOUBLE PRECISION NOT NULL,
    "type" "transaction_types" NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_exchange_rate_id" TEXT NOT NULL,
    "transaction_credit_wallet_id" TEXT NOT NULL,
    "transaction_debit_wallet_id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" VARCHAR(40) NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "currency_from" "supported_currencies" NOT NULL,
    "currency_to" "supported_currencies" NOT NULL,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_exchange_rate_id_fkey" FOREIGN KEY ("transaction_exchange_rate_id") REFERENCES "ExchangeRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_credit_wallet_id_fkey" FOREIGN KEY ("transaction_credit_wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_debit_wallet_id_fkey" FOREIGN KEY ("transaction_debit_wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
