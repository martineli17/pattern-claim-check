import { Injectable, Scope } from "@nestjs/common";
import { DemoSubscriber } from "./demo.subscriber";

@Injectable({ scope: Scope.DEFAULT })
export class RegisterSubscribers {
    constructor(demoSubscriber: DemoSubscriber){
        demoSubscriber.handle();
    }
}