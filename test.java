import java.util.Scanner;

public class test {

    final static int maxTries = 3;
    final static String correctPassword = "test";

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int tries = 0;
        

        while (true) {

            System.out.print("Enter Password: ");
            String password = sc.next();

            if (password == null ? correctPassword != null : !password.equals(correctPassword)) {
                System.out.println("Please try again!");
                tries++;

                if (tries >= maxTries) {

                    System.out.println("You have exceeded your amount of tries. Please try again later");
                    break;

                }

            } else {
                System.out.println("Correct password!");

                break;
            }

            

        }

        sc.close();
    }

    

}