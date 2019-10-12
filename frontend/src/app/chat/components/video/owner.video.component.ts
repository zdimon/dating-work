
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import {WebRtcService} from '../../../service/webrts.service';
import {SocketService} from '../../../service/socket.service';
import {Room, RoomState} from '../../store/chat.store';
import { selectCurrentRoom } from '../../store/chat.selector';
import { Store } from '@ngrx/store';
import {Subscription} from 'rxjs';


const mediaConstraints: RTCOfferOptions = {

  offerToReceiveAudio: true,
  offerToReceiveVideo: true

};


const ICE_SERVERS: RTCIceServer[] = [
  {urls: 'stun:stun.l.google.com:19302'}
];

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: ICE_SERVERS
};

@Component({
  selector: 'app-chat-owner-video',
  templateUrl: './owner.video.component.html',
  styleUrls: ['./owner.video.component.css']
})
export class OwnerVideoComponent implements OnInit {

  is_video: boolean = false;
  @ViewChild('hardwareVideo', {static: false}) hardwareVideo: any;
  _navigator = <any> navigator;
  localStream;
  private peerConnection: RTCPeerConnection;
  private current_room: Room;
  answer_observer: Subscription;
  ice_observer: Subscription;

  constructor(
    private webrtc: WebRtcService,
    private socket_service: SocketService,
    private room_store: Store<RoomState>,
  ) {

    this.room_store.select(selectCurrentRoom).subscribe((room: Room) => {
      this.current_room = room;
     });

     this.answer_observer = this.socket_service._answer_emmiter$.subscribe((data: any) => {
      console.log('answer gotten');
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.data.offer));
      console.log(this.peerConnection);
    })

    this.ice_observer = this.socket_service._ice_emmiter$.subscribe((data: any) => {
      console.log('ice gotten');
      console.log(this.peerConnection);
      console.log(data.data);
      if(this.peerConnection) {
        console.log('puting ice');
        this.peerConnection.addIceCandidate(new RTCIceCandidate(data.data.ice)).catch(this.errorHandler);
        }
    })

  }

   ngOnInit() {

  }




  getMedia(event: any){
    const video = this.hardwareVideo.nativeElement;
    this._navigator = <any>navigator;

    this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
    || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

    this._navigator.mediaDevices.getUserMedia({video: { width: 400,  height: 300 }, audio: false})
      .then((stream) => {
        this.localStream = stream;
        video.srcObject=stream;
        video.play();


    });
    this.is_video = true;
    //this.makeConnection();
  }



  removeMedia(event: any){
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    this.is_video = false;
  }

  makeConnection(){
    ///this.webrtc.init();



    this.setupPeerConnection((conn: any) => {
      this.localStream.getTracks().forEach((track: any) => {
        console.log('adding track');
        console.log(track);
        conn.addTrack(track,this.localStream);
      })
    });

    this.peerConnection
    .createOffer(mediaConstraints)
    .then(this.setDescription())
    .catch(this.errorHandler);

  }


  private setupPeerConnection(clb: any) {
    this.peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    this.peerConnection.onicecandidate = this.getIceCandidateCallback();

    clb(this.peerConnection);
    // this.peerConnection.ondatachannel = (event) => { console.log(`received message from channel`); };
    // this.sendChannel = this.peerConnection.createDataChannel('sendDataChannel');
  }

  private setDescription(): (string) => void {
    return (description) => {
      console.log('got description');
      console.log(description);



      this.peerConnection.setLocalDescription(description)
        .then(() => {
          this.webrtc.sendOffer({
            'offer': description,
            'room_id': this.current_room.id
          }).subscribe((data: any) => {
              console.log(data);
          });
        })
        .catch(this.errorHandler);
    };
  }

  private getIceCandidateCallback(): (string) => void {
    return (event) => {
      console.log(`got ice candidate:`);
      console.log(event);

      if (event.candidate != null) {
        let data = {

          room_id: this.current_room.id,
          ice: event.candidate
        }
        this.webrtc.sendIce(data).subscribe((data: any) => {
          console.log(data);
        });

      }
    };
  }

  private errorHandler(error) {
    console.log(error);
  }

  ngOnDestroy(){
    //this.answer_observer.unsubscribe();
    //this.ice_observer.unsubscribe();
  }

}
