
// storage here is the ammount of notes
export function calculateCost(storage) {
    // This is basically saying that if a user wants to
    // store 10 or fewer notes, we’ll charge them $4 per note.
    // For 11 to 100 notes, we’ll charge $2 and any more than 100 is $1 per note.
    const rate = storage <= 10
    ? 4
    : storage <= 100
      ? 2
      : 1;

    // Since Stripe expects us to provide the amount in pennies
    // (the currency’s smallest unit) we multiply the result by
    // 100. Clearly, our serverless infrastructure might be cheap
    // but our service isn’t!
    return rate * storage * 100;
}