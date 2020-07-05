<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    :title="`About ${$o.app.name}`">
    <div class="q-pa-md column q-gutter-y-md">
      <q-card class="shadow-light">
        <q-card-section class="text-center">
          <q-img width="120px" basic src="~assets/icon.png" />
          <div class="text-body1">
            {{ $o.app.name }}
          </div>
          <div class="text-caption">
            {{ $o.app.version }}
          </div>
        </q-card-section>
        <q-card-section>
          <p>
            <strong>enFocus</strong> combines of three of the best productivity techniques: To-do list, Pomodoro and Eisenhower Method in one cohesive workflow, presented in a simple, clean and minimalist app.
          </p>
          <div class="q-pl-sm">
            <div>📋 Organize your tasks into projects.</div>
            <div>⏱️ Work on your tasks into chunks of focused sprints.</div>
            <div>⚖️ Manage priorities, eliminate "mere-urgency" and time-wasters tasks.</div>
            <div>📊 Keep track of your progress.</div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="shadow-light q-pa-sm">
        <q-card-section>
          <div class="text-h6">The Pomodoro Technique®</div>
          <div class="text-subtitle2">Trademarked by Francesco Cirillo</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Developed by Francesco Cirilo in the late 1980's, the technique uses a timer to break down work into intervals, 25 minutes in length, separated by short breaks of 5 minutes, and a 15-minute long break after 4 successive sprints. This philosophy aims to provide the user with the maximum focus and creative freshness, thereby allowing them to complete projects faster with less mental fatigue.
        </q-card-section>
      </q-card>
      <q-card class="shadow-light q-pa-sm">
        <q-card-section>
          <div class="text-h6">Eisenhower Method</div>
          <div class="text-subtitle2">Dwight D. Eisenhower</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p>The Eisenhower Method complements the Pomodoro Technique really well. This method stems from a quote attributed to Dwight D. Eisenhower: <i>"I have two kinds of problems, the urgent and the important. The urgent are not important, and the important are never urgent."</i></p>
          <p>The Eisenhower Method is a simple tool for considering the long-term outcomes of your daily tasks and focusing on what will make you most efficient, not just most productive. Visualize all your tasks in a matrix of urgent/important. All of your daily tasks and projects should fall into one of these four quadrants:</p>
          <ul>
            <li>Urgent & Important tasks are to be done immediately</li>
            <li>Not Urgent & Important tasks are to be scheduled or considered in other quadrants</li>
            <li>Urgent & Unimportant tasks are to be delegated to someone else</li>
            <li>Not Urgent & Unimportant tasks are to be deleted</li>
          </ul>
        </q-card-section>
      </q-card>
      <q-card class="shadow-light q-pa-sm bg-blue-grey-1">
        <q-card-section>
          <div class="text-h6">Privacy Policy</div>
          <div class="text-subtitle2">Data Handling</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          This app does <strong>NOT</strong> collect any browser history, biometrics, contact, financial nor medical information.
        </q-card-section>
      </q-card>
      <q-card class="shadow-light q-pa-sm">
        <q-card-section>
          <div class="text-h6">Third Party</div>
          <div class="text-subtitle2">Legal Notices</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          This app is not affiliated with, associated with, or endorsed by the Pomodoro Technique® or Francesco Cirillo.
        </q-card-section>
      </q-card>
      <q-card class="shadow-light q-pa-sm bg-black text-cyan">
        <q-card-section>
          <div class="text-h6">Contact Us</div>
          <div class="text-subtitle2 text-white">Night Owl Software Studios</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Found a bug? Have a killer feature in mind? Or just want to talk about something? Feel free to contact us on the following channels:
        </q-card-section>
        <q-list class="q-pb-md">
          <q-item
            @click="openURL('mailto:nightowlsoftwarestudios@gmail.com')"
            clickable
            v-ripple>
            <q-item-section side>
              <q-icon name="contact_mail" color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Email</q-item-label>
              <q-item-label caption class="text-white">nightowlsoftwarestudios@gmail.com</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            @click="openURL('https://groups.google.com/forum/#!categories/enfocus-app/bug-report')"
            clickable
            v-ripple>
            <q-item-section side>
              <q-icon name="bug_report" color="white"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">File a bug</q-item-label>
              <q-item-label caption class="text-white">enfocus-app@googlegroups.com</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            @click="openURL('https://groups.google.com/forum/#!categories/enfocus-app/feature-request')"
            clickable
            v-ripple>
            <q-item-section side>
              <q-icon name="contact_support" color="white"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Feature Request</q-item-label>
              <q-item-label caption class="text-white">enfocus-app@googlegroups.com</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </opus-dialog>
</template>
<script>
import OpusDialog from 'lib/commons/OpusDialog'
import UseOpusDialog from 'lib/commons/opus-dialog-functions'

import { openURL } from 'quasar'

export default {
  name: 'AboutDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  methods: { openURL }
}
</script>
