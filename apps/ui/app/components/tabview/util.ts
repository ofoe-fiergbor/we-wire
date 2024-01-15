import {ITransaction, TableData} from "@/app/components/tabview/constants";

const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

export const formatTransactionsToTable = (
    transactions: ITransaction[],
): TableData[] => {
    return transactions.map(transaction => {
        return {
            id: transaction.id,
            transactionType: transaction.type === 'DEBIT' ? 'Debit' : 'Credit',
            amount: `${transaction.currency} ${transaction.amount}`,
            status: capitalizeFirstLetter(transaction.status),
            date: new Date(transaction.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
        }
    })
}

function capitalizeFirstLetter(word: string): string {
    if (word.length === 0) {
        return word;
    } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
}
