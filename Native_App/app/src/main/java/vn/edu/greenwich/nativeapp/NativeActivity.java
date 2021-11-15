package vn.edu.greenwich.nativeapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class NativeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native);

        TextView tvPropertyname = findViewById(R.id.tvPropertyname_Test);
        TextView tvPropertyaddress = findViewById(R.id.tvPropertyaddress_Test);
        TextView tvPropertytype = findViewById(R.id.tvPropertytype_Test);
        TextView tvBedrooms = findViewById(R.id.tvBedrooms_Test);
        TextView tvPrice = findViewById(R.id.tvPrices_Test);
        TextView tvFurnituretypes = findViewById(R.id.tvFurnituretypes_Test);
        TextView tvReporter = findViewById(R.id.tvReporter_Test);


        String propertyname = "", propertyaddress = "",propertytype = "", bedrooms = "",price = "",furnituretypes = "", reporter = "";

        Intent intent = getIntent();

        // 1st method to receive data.
        Bundle bundle = intent.getExtras();

        if (bundle != null) {
            propertyname = bundle.getString("propertyname");
            propertyaddress = bundle.getString("propertyaddress");
            propertytype = bundle.getString("propertytype");
            bedrooms = bundle.getString("bedrooms");
            price = bundle.getString("price");
            furnituretypes = bundle.getString("furnituretypes");
            reporter = bundle.getString("reporter");
        }

        // 2nd method to receive data.
        //username = intent.getStringExtra("username");
        //password = intent.getStringExtra("password");

        tvPropertyname.setText(propertyname);
        tvPropertyaddress.setText(propertyaddress);
        tvPropertytype.setText(propertytype);
        tvBedrooms.setText(bedrooms);
        tvPrice.setText(price);
        tvFurnituretypes.setText(furnituretypes);
        tvReporter.setText(reporter);

    }
}