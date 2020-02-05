package arti.cdac.project.coursecoordinator.activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import arti.cdac.project.coursecoordinator.R;
import arti.cdac.project.coursecoordinator.model.Batch;
import arti.cdac.project.coursecoordinator.model.Class;
import arti.cdac.project.coursecoordinator.service.UserServices;
import arti.cdac.project.coursecoordinator.utils.Constants;
import arti.cdac.project.coursecoordinator.utils.Utils;
import butterknife.BindView;
import butterknife.ButterKnife;

public class RegistrationActivity extends AppCompatActivity {

    @BindView(R.id.imageView) ImageView imageView;

    public ArrayList<Class> classArrayList=new ArrayList<>();
    ArrayAdapter<Class> adapterDepartments;
    @BindView(R.id.spinnerCourse) Spinner spinnerCourse;

    public ArrayList<Batch> batchArrayList=new ArrayList<>();
    ArrayAdapter<Batch> batchArrayAdapter;
    @BindView(R.id.spinnerBatch) Spinner spinnerBatch;

    public String propic;

    String genderArray[] = {"Male", "Female"};
    ArrayAdapter<String> adapterGender;
    @BindView(R.id.spinnerGender) Spinner spinnerGender;

    @BindView(R.id.editName) EditText editName;
    @BindView(R.id.editEmail) EditText editEmail;
    @BindView(R.id.editPrn) EditText editPrn;
    @BindView(R.id.editdob) EditText editdob;
    @BindView(R.id.editPassword) EditText editPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        ButterKnife.bind(this);

        adapterDepartments = new ArrayAdapter<Class>(this, android.R.layout.simple_list_item_1, classArrayList);
        spinnerCourse.setAdapter(adapterDepartments);

        batchArrayAdapter = new ArrayAdapter<Batch>(this, android.R.layout.simple_list_item_1, batchArrayList);
        spinnerBatch.setAdapter(batchArrayAdapter);

        adapterGender = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, genderArray);
        spinnerGender.setAdapter(adapterGender);

    }

    @Override
    protected void onResume() {
        super.onResume();
        loadCourse();
        loadBatch();
    }

    void loadCourse() {

        classArrayList.clear();
        final String url = Utils.getUrl(Constants.PATH_CLASS);
        Ion.with(this)
                .load(url)
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        String status = result.get("status").getAsString();
                        if (status.equals("success")) {
                            JsonArray jsonArray = result.get("data").getAsJsonArray();
                            for (int index = 0; index < jsonArray.size(); index++) {
                                JsonObject object = jsonArray.get(index).getAsJsonObject();

                                Class objectClass=new Class();
                                objectClass.setClass_id(object.get("course_id").getAsInt());
                                objectClass.setClass_name(object.get("course_name").getAsString());
                                classArrayList.add(objectClass);
                            }
                            //return classArrayList;
                            adapterDepartments.notifyDataSetChanged();
                        }
                    }
                });

    }

    void loadBatch() {

        classArrayList.clear();
        final String url = Utils.getUrl(Constants.PATH_BATCH);
        Ion.with(this)
                .load(url)
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        String status = result.get("status").getAsString();
                        if (status.equals("success")) {
                            JsonArray jsonArray = result.get("data").getAsJsonArray();
                            for (int index = 0; index < jsonArray.size(); index++) {
                                JsonObject object = jsonArray.get(index).getAsJsonObject();

                                Batch objectClass=new Batch();
                                objectClass.setBatch_id(object.get("batch_id").getAsInt());
                                objectClass.setBatch_name(object.get("batch_name").getAsString());
                                batchArrayList.add(objectClass);
                            }
                            //return classArrayList;
                            batchArrayAdapter.notifyDataSetChanged();
                            Log.e("batch",batchArrayList.toString());
                        }
                    }
                });

    }

    public void onCapture(View v) {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                == PackageManager.PERMISSION_GRANTED) {
            takePhoto();
        } else {
            ActivityCompat.requestPermissions(this,
                    new String[] {
                            Manifest.permission.WRITE_EXTERNAL_STORAGE,
                            Manifest.permission.READ_EXTERNAL_STORAGE
                    }, 0);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if ((grantResults[0] == PackageManager.PERMISSION_GRANTED) &&
                (grantResults[1] == PackageManager.PERMISSION_GRANTED)) {

            takePhoto();
        }
    }

    private void takePhoto() {
        Intent intent = new Intent();
        intent.setAction(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent, 0);
    }

    public void onUpload(View v) {
//        Ion.with(this)
//            .load("http://172.18.6.199:4000/")
//            .asJsonObject()
//            .setCallback(new FutureCallback<JsonObject>() {
//                @Override
//                public void onCompleted(Exception e, JsonObject result) {
//                    Log.e("MainActivity", result.toString());
//                }
//            });

        Ion.with(this)
                .load("POST", "http://192.168.2.21:4000/student/profile")
                .setMultipartFile("photo", "image/jpeg", new File("/sdcard/myphoto.jpg"))
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        propic=result.get("status").getAsString();

                        Log.e("MainActivity234", propic);
                        Log.e("MainActivity", result.get("status").getAsString());
                    }
                });
    }

    public void onRegister(View v) {
        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();
        String name = editName.getText().toString();
        String dob=editdob.getText().toString();
        String prn=editPrn.getText().toString();

        int position = spinnerGender.getSelectedItemPosition();
        String gender=genderArray[position];

        int position2 = spinnerCourse.getSelectedItemPosition();
        int course=classArrayList.get(position2).getClass_id();

        int position3 = spinnerBatch.getSelectedItemPosition();
        int batch=batchArrayList.get(position3).getBatch_id();

        if (name.length() == 0) {
            editName.setError("Name is mandatory");
        } else if (email.length() == 0) {
            editEmail.setError("Email is mandatory");
        } else if (password.length() == 0) {
            editPassword.setError("Password is mandatory");
        } else {

            final String url = Utils.getUrl(Constants.PATH_STUDENT + "/anregister");

            final JsonObject body = new JsonObject();
            body.addProperty("stud_email", email);
            body.addProperty("stud_password", password);
            body.addProperty("stud_name", name);
            body.addProperty("stud_bdate", dob);
            body.addProperty("stud_prn", prn);
            body.addProperty("stud_gender", gender);
            body.addProperty("course_id", course);
            body.addProperty("batch_id", batch);
            body.addProperty("role", "Student");

            body.addProperty("stud_propic", propic);

            Log.e("body", body.toString());

            Ion.with(this)
                    .load("POST", url)
                    .setJsonObjectBody(body)
                    .asJsonObject()
                    .setCallback(new FutureCallback<JsonObject>() {
                        @Override
                        public void onCompleted(Exception e, JsonObject result) {
                            String status = result.get("status").getAsString();
                            if (status.equals("success")) {
                                finish();
                            } else {
                                String error = result.get("error").getAsString();
                                Toast.makeText(RegistrationActivity.this, error, Toast.LENGTH_SHORT).show();
                            }
                        }
                    });

        }
    }

    public void onCancel(View v) {
        finish();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (data != null) {
            Bundle extras = data.getExtras();
            Bitmap bitmap = (Bitmap) extras.get("data");
            imageView.setImageBitmap(bitmap);

            try {
                // create the file
                File file = new File("/sdcard/myphoto.jpg");
                FileOutputStream stream = new FileOutputStream(file);

                // save the image
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, stream);

                stream.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
