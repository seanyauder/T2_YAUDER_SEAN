using System;

namespace ATMSimulation_Yauder {
    class Program {

        // denomination Variables
        static int largeNote = 50; // Represents the large note denomination
        static int smallNote = 20; // Represents the small note denomination

        // Fee Variables
        static double internationalFee = 4.50; // Represents the fee for international cards
        static double withdrawalThreshold = 300.00; // Represents the threshold for additional fees for withdrawals over 300.00
        static double percentageFee = 0.01; // Represents the percentage fee for withdrawals over the threshold

        // Authentication & Account status variables
        static int correctPin = 4821; // Example correct PIN
        static bool isCardBlocked = false;
        static bool isInternationalCard = true; // Example: true if the card is international, false otherwise
        static bool isVipCustomer = false;

        // Account Balances & Limits variables
        static int maxPinAttempts = 3;
        static double accountBalance = 1250.00;
        static double dailyWithdrawalLimit = 500.00;
        static double dailyWithdrawnAmount = 150.00;

        static void Main(string[] args) {

            Console.WriteLine("Welcome to the ATM Simulation!");
            
            if (!authenticateCard()) {
                return;
            }

            Console.WriteLine($"Current account balance: ₱{accountBalance}");

            double withdrawalAmount = getWithdrawalAmount();

            if (!validateWithdrawal(withdrawalAmount)) {
                return;
            }

            if (!validateDailyLimit(withdrawalAmount)) {
                return;
            }

            double totalFees = calculateFees(withdrawalAmount);

            double totalDeduction = withdrawalAmount + totalFees;

            if (totalDeduction > accountBalance) {
                Console.WriteLine($"Declined: Balance cannot cover withdrawal plus fees (₱{totalDeduction:F2}).");
                return;
            }

            accountBalance -= totalDeduction;
            dailyWithdrawnAmount += withdrawalAmount;

            printReceipt(withdrawalAmount, totalFees, totalDeduction);

            Console.WriteLine("Transaction completed successfully.");

        }

        static bool authenticateCard() {

            if (isCardBlocked) {
                Console.WriteLine("Card is blocked. Please visit your nearest branch.");
                // Terminate the program or return to main menu
                return false;
            }

            Console.WriteLine("Please enter your PIN:");
            string inputPin = Console.ReadLine() ?? "";
                
            if (!int.TryParse(inputPin, out int enteredPin)) {
                Console.WriteLine("Invalid Transaction Input. Please enter a numeric PIN.");
                return false; // Prompt for PIN again
            }

            if (enteredPin != correctPin) {
                Console.WriteLine("Incorrect PIN. Please try again.");
                return false;
            }

            // Will continue fixing later.
            Console.WriteLine("Pin verified successfully.");
            return true;
        }

        static double getWithdrawalAmount() {

            Console.WriteLine("Please enter the amount you wish to withdraw: ");
            string inputAmount = Console.ReadLine() ?? "";

            if (!double.TryParse(inputAmount, out double amount)) {
                Console.WriteLine("Invalid Transaction Input. Please enter a numeric amount.");
                return 0.00;
            }

            return amount;
        }

        static bool validateWithdrawal(double amount) {
            if (amount <= 0) {
                Console.WriteLine("Invalid amount. Must be greater than zero.");
                return false;
            }

            if (amount > accountBalance) {
                Console.WriteLine("Insufficient funds. Transaction aborted.");
                return false;
            }

            if (amount % smallNote != 0 && amount % largeNote != 0) {
                Console.WriteLine("Invalid denomination. Machine only dispenses ₱20 and ₱50 notes");
                return false;
            }

            return true;
        }

        static bool validateDailyLimit(double amount) {
            double remainingLimit = dailyWithdrawalLimit - dailyWithdrawnAmount;

            if (amount > remainingLimit) {
                Console.WriteLine($"Daily withdrawal limit exceeded. You can only withdraw up to ₱{remainingLimit:F2} today.");
                return false;
            }

            return true;
        }

        static double calculateFees(double amount) {
            double fees = 0.00;

            if (!isVipCustomer)
            {

                if (isInternationalCard) {
                    fees += internationalFee;
                }

                if (amount > withdrawalThreshold) {
                    fees += amount * percentageFee;
                }

            }

            return fees;
        }

        static void printReceipt(double amount, double fees, double totalDeduction) {
            Console.WriteLine("----- Transaction Receipt -----");
            Console.WriteLine($"Withdrawal Amount: ₱{amount:F2}");
            Console.WriteLine($"Fees Charged: ₱{fees:F2}");
            Console.WriteLine($"Total Deducted: ₱{totalDeduction:F2}");
            Console.WriteLine($"Remaining Balance: ₱{accountBalance:F2}");
            Console.WriteLine("--------------------------------");
        }

    }
}