
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {SocketService} from '../../../service/socket.service';
import {Subscription} from 'rxjs';
import {Room, RoomState} from '../../store/chat.store';
import { selectCurrentRoom } from '../../store/chat.selector';
import { Store } from '@ngrx/store';
import {WebRtcService} from '../../../service/webrts.service';

const ICE_SERVERS: RTCIceServer[] = [
  {urls: 'stun:stun.l.google.com:19302'}
];

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: ICE_SERVERS
};

@Component({
  selector: 'app-chat-abonent-video',
  templateUrl: './abonent.video.component.html',
  styleUrls: ['./abonent.video.component.css']
})
export class AbonentVideoComponent implements OnInit, OnDestroy {

  @Input() user: any;
  @ViewChild('abonentVideo', {static: true}) abonentVideo: any;
  private peerConnection: RTCPeerConnection;


  offer_observer: Subscription;
  answer_observer: Subscription;
  ice_observer: Subscription;
  video:any;
  private current_room: Room;

  constructor(
    private socket_service: SocketService,
    private room_store: Store<RoomState>,
    private webrtc: WebRtcService,
    ) {



      this.room_store.select(selectCurrentRoom).subscribe((room: Room) => {
        this.current_room = room;
       });



    this.offer_observer = this.socket_service._offer_emmiter$.subscribe((data: any) => {
      console.log(data);
      this.setupPeerConnection();
      this.peerConnection.setRemoteDescription(data.data.offer)
      .then( () => {
          this.peerConnection.createAnswer()
          .then(this.setDescription())
          .catch(this.errorHandler);
        }
      )
      .catch(this.errorHandler);
      ;
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



  private gotRemoteStream = (event: any) => {
      console.log('got remote stream');
      console.log(event);
      this.video.srcObject = event.streams[0];
  }


  private setDescription(): (string) => void {
    return (description) => {
      console.log('got description');
      console.log(description);
      console.log(this.peerConnection);
      //this.socket_service.sendOffer({'offer': description})

      this.peerConnection.setLocalDescription(description)
        .then(() => {
          //this.signalingConnection.send(JSON.stringify({ 'sdp': this.peerConnection.localDescription, 'uuid': this.uuid }));
        })
        .catch(this.errorHandler);

      this.webrtc.sendAnswer({
        'offer': description,
        'room_id': this.current_room.id
      }).subscribe((data: any) => {
          console.log(data);
      });



    };
   }

  private errorHandler(error) {
    console.log(error);
  }

   ngOnInit() {
    this.video = this.abonentVideo.nativeElement;

  }

  ngOnDestroy(){
    //this.offer_observer.unsubscribe();
    //this.answer_observer.unsubscribe();
    //this.ice_observer.unsubscribe();
  }


  private setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    this.peerConnection.onicecandidate = this.getIceCandidateCallback();
    this.peerConnection.ontrack = this.gotRemoteStream;
    //const video = this.abonentVideo.nativeElement;

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

}
