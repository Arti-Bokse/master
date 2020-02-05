package arti.cdac.project.coursecoordinator.service;

import android.content.Context;
import android.util.Log;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import java.util.ArrayList;

import arti.cdac.project.coursecoordinator.model.Class;
import arti.cdac.project.coursecoordinator.utils.Constants;
import arti.cdac.project.coursecoordinator.utils.Utils;

public class UserServices {

    ArrayList<Class> classArrayList=new ArrayList<>();

    public ArrayList<Class> loadCourse(Context context) {

        //classArrayList.clear();
        final String url = Utils.getUrl(Constants.PATH_CLASS);
        Log.e("heeeellloooo",url);
        Ion.with(context)
                .load(url)
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        String status = result.get("status").getAsString();
                        if (status.equals("success")) {
                            JsonArray jsonArray = result.get("data").getAsJsonArray();
                            Log.e("heeeeoooo",jsonArray.toString());
                            for (int index = 0; index < jsonArray.size(); index++) {
                                JsonObject object = jsonArray.get(index).getAsJsonObject();

                                Class objectClass=new Class();
                                objectClass.setClass_id(object.get("course_id").getAsInt());
                                objectClass.setClass_name(object.get("course_name").getAsString());
                                classArrayList.add(objectClass);
                            }
                            Log.e("heeeellloooo",classArrayList.toString());
                            //return classArrayList;
                        }
                    }
                });

        return classArrayList;

    }

}
