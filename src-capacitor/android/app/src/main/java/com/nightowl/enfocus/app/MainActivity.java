package com.nightowl.enfocus.app;

import android.os.Bundle;

import com.devutex.admobadvanced.AdMobAdvanced;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.go.capacitor.keepscreenon.CapacitorKeepScreenOn;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(CapacitorKeepScreenOn.class);
      add(AdMobAdvanced.class);
    }});
  }
}
