import { Component, OnDestroy } from '@angular/core';
import { animate, animation, AnimationBuilder, AnimationPlayer, group, query, style, useAnimation } from '@angular/animations';

export const someAnimation = animation([
  group([
    query('.some-element-selector', [
      style({ opacity: '0' }),
      animate('2s', style({ opacity: '1' }))
    ]),
    query('.some-other-element-selector', [
      style({ backgroundColor: 'red', height: '200px' }),
      animate('2s', style({ backgroundColor: 'white', height: '*' }))
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  animationPlayer: AnimationPlayer;

  constructor(private animationBuilder: AnimationBuilder) {
  }

  onStartAnimationClicked(): void {
    const someOnDoneCallback = () => {
      console.log('Finished animating');
    };

    this.createAndStartAnimation(someOnDoneCallback);
  }

  private createAndStartAnimation(callback: () => void) {
    const animationFactory = this.animationBuilder.build([
      useAnimation(someAnimation)
    ]);

    this.animationPlayer = animationFactory.create(window.document);

    this.animationPlayer.onDone(() => {
      this.animationPlayer.destroy();
      this.animationPlayer = null;
      if (callback) {
        callback();
      }
    });

    this.animationPlayer.play();
  }

  ngOnDestroy(): void {
    if (this.animationPlayer) {
      this.animationPlayer.finish();
    }
  }
}
