package arti.cdac.project.coursecoordinator.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import java.util.ArrayList;

import arti.cdac.project.coursecoordinator.R;
import arti.cdac.project.coursecoordinator.activity.HomeActivity;
import arti.cdac.project.coursecoordinator.activity.MainActivity;
import arti.cdac.project.coursecoordinator.model.Batch;
import arti.cdac.project.coursecoordinator.model.Student;
import arti.cdac.project.coursecoordinator.utils.Constants;
import arti.cdac.project.coursecoordinator.utils.Utils;
import butterknife.BindView;
import butterknife.ButterKnife;

public class LoginActivity extends AppCompatActivity {

    @BindView(R.id.editEmail) EditText editEmail;
    @BindView(R.id.editPassword) EditText editPassword;

    ArrayList<Student> studentArrayList=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);
    }

    public void onLogin(View v) {
        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();

        if (email.length() == 0) {
            editEmail.setError("Email is mandatory");
        } else if (password.length() == 0) {
            editPassword.setError("Password is mandatory");
        } else {

            SharedPreferences preferences =
                    PreferenceManager.getDefaultSharedPreferences(this);

            String device_token = preferences.getString("device_token", "");
            final String url = Utils.getUrl(Constants.PATH_STUDENT + "/login");

            final JsonObject body = new JsonObject();
            body.addProperty("stud_email", email);
            body.addProperty("stud_password", password);
            //body.addProperty("device_token", device_token);

            Ion.with(this)
                    .load("POST", url)
                    .setJsonObjectBody(body)
                    .asJsonObject()
                    .setCallback(new FutureCallback<JsonObject>() {
                        @Override
                        public void onCompleted(Exception e, JsonObject result) {
                            String status = result.get("status").getAsString();
                            if (status.equals("success")) {
                                JsonObject jsonArray = result.get("data").getAsJsonObject();
                                JsonObject object = jsonArray.getAsJsonObject();

                                Student objectClass=new Student();
                                objectClass.setStud_name(object.get("stud_name").getAsString());
                                objectClass.setStud_email(object.get("stud_email").getAsString());
                                objectClass.setStud_propic(object.get("stud_propic").getAsString());
                                studentArrayList.add(objectClass);
                                //return classArrayList;
                                Log.e("batch",studentArrayList.toString());
                                Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                                intent.putExtra("name",studentArrayList.get(0).getStud_name());
                                intent.putExtra("email",studentArrayList.get(0).getStud_email());
                                intent.putExtra("pic",studentArrayList.get(0).getStud_propic());
                                startActivity(intent);
                                finish();
                            } else {
                                String error = result.get("error").getAsString();
                                Toast.makeText(LoginActivity.this, error, Toast.LENGTH_SHORT).show();
                            }
                        }
                    });

        }
    }

    public void onRegister(View v) {
        Intent intent = new Intent(LoginActivity.this, RegistrationActivity.class);
        startActivity(intent);
    }
}
