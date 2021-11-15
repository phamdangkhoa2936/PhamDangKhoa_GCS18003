package vn.edu.greenwich.nativeapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Link to the layout "activity_main.xml".
        setContentView(R.layout.activity_main);

        // Get the content of string "btn_login" in "strings.xml".
        String btnCreateName = getResources().getString(R.string.btn_create);
        // Get the content of string "notification_01" in "strings.xml".
        String notification_02 = getResources().getString(R.string.notification_02);

        // Like "alert" in JavaScript.
        Toast.makeText(this, notification_02, Toast.LENGTH_LONG).show();

        // Get button "Login" from current Layout using id of button.
        Button btnCreate = findViewById(R.id.btnCreate);
        // Set the name of the button.
        btnCreate.setText(btnCreateName);
        // Add an event "Click" to the button.
        btnCreate.setOnClickListener(btnCreate_Click);
    }

    private View.OnClickListener btnCreate_Click = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Boolean isValid = true;

            TextView tvError = findViewById(R.id.tvError);
            TextView tvPropertyname = findViewById(R.id.tvPropertyname);
            TextView tvPropertyaddress = findViewById(R.id.tvPropertyaddress);
            TextView tvPropertytype = findViewById(R.id.tvPropertytype);
            TextView tvBedrooms = findViewById(R.id.tvBedrooms);
            TextView tvPrice = findViewById(R.id.tvPrice);
            TextView tvFurnituretypes = findViewById(R.id.tvFurnituretypes);
            TextView tvReporter = findViewById(R.id.tvReporter);

            String error = "";
            // Get content of textview "Propertyname".
            String propertyname = tvPropertyname.getText().toString();
            // Get content of textview "Propertyaddress".
            String propertyaddress = tvPropertyaddress.getText().toString();
            // Get content of textview "Propertytype".
            String propertytype = tvPropertytype.getText().toString();
            // Get content of textview "Bedrooms".
            String bedrooms = tvBedrooms.getText().toString();
            // Get content of textview "Price".
            String price = tvPrice.getText().toString();
            // Get content of textview "Furnituretypes".
            String furnituretypes = tvFurnituretypes.getText().toString();
            // Get content of textview "Reporter".
            String reporter = tvReporter.getText().toString();

            String notification_02 = getResources().getString(R.string.notification_02);

            // Like "alert" in JavaScript.
            Toast.makeText(v.getContext(), notification_02, Toast.LENGTH_LONG).show();

            // Check whether property name is empty or not.
            if (TextUtils.isEmpty(propertyname)) {
                isValid = false;
                error += "* Property Name cannot be blank.\n";
            }

            // Check whether property address is empty or not.
            if (TextUtils.isEmpty(propertyaddress)) {
                isValid = false;
                error += "* Property Address cannot be blank.\n";
            }

            // Check whether property type is empty or not.
            if (TextUtils.isEmpty(propertytype)) {
                isValid = false;
                error += "* Property Type cannot be blank.\n";
            }

            // Check whether bedrooms is empty or not.
            if (TextUtils.isEmpty(bedrooms)) {
                isValid = false;
                error += "* Bedrooms cannot be blank.\n";
            }

            // Check whether price is empty or not.
            if (TextUtils.isEmpty(price)) {
                isValid = false;
                error += "* Price cannot be blank.\n";
            }

            // Check whether furniture types is empty or not.
            if (TextUtils.isEmpty(furnituretypes)) {
                isValid = false;
                error += "* Furniture Types cannot be blank.\n";
            }

            // Check whether reporter is empty or not.
            if (TextUtils.isEmpty(reporter)) {
                isValid = false;
                error += "* Reporter cannot be blank.\n";
            }

            // Check whether form is valid or not.
            if (isValid) {
                // Show alerts.
                Toast.makeText(v.getContext(), propertyname, Toast.LENGTH_LONG).show();

                // Show logs.
                Log.w("Main Activity", "This is a Warning Log.");
                Log.i("Main Activity", "This is an Information Log.");
                Log.d("Main Activity", "This is a Debug Log.");
                Log.v("Main Activity", "This is a Verbose Log.");

                Bundle accountInfo = new Bundle();
                accountInfo.putString("propertyname", propertyname);
                accountInfo.putString("propertyaddress", propertyaddress);
                accountInfo.putString("propertytype", propertytype);
                accountInfo.putString("bedrooms", bedrooms);
                accountInfo.putString("price", price);
                accountInfo.putString("furnituretypes", furnituretypes);
                accountInfo.putString("reporter", reporter);


                // Create a new activity and start it.
                Intent testActivity = new Intent(v.getContext(), NativeActivity.class);

                // 1st method to transfer data.
                testActivity.putExtras(accountInfo);

                // 2nd method to transfer data.
                //testActivity.putExtra("username", username);
                //testActivity.putExtra("password", password);

                // Start "TestActivity".
                startActivity(testActivity);

                // Terminate current activity.
                finish();
            } else {
                // Display errors in textview.
                tvError.setText(error);

                // Display errors in logs.
                Log.e("Main Activity", error);
            }
        }
    };
}