import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  standalone: false,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'RXJS';

  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Willian') {
        setTimeout(() => {
          resolve('Seja Bem Vindo ' + nome);
        }, 1000)
      }
      else {
        reject('Ops! Você Não É o Willian');
      }
    })
  }

  minhaObservable(nome: string): Observable<string> {
    return new Observable(subscriber => {
      if (nome === 'Willian') {
        subscriber.next('Olá Willian');
        setTimeout(() => {
          subscriber.next('Ola Depois do Timer');
        }, 3000)
        subscriber.complete();
      }
      else {
        subscriber.error('Erro de Comunicação');
      }
    })
  }

  usuarioObservable(nome: string, email: string): Observable<Usuario> {
    return new Observable(subscriber => {
      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000)

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000)

        setTimeout(() => {
          subscriber.complete();
        }, 5000);

      }
      else {
        subscriber.error('Erro de Comunicação');
      }
    })
  }

  ngOnInit(): void {
    /* this.minhaPromise('Willian')
       .then(result => console.log(result)); */

    /* this.minhaPromise('Willians')
      .then(result => console.log(result))
      .catch(err => console.log(err)) */

    /* this.minhaObservable('Willians').subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    }) */

    /* this.minhaObservable('Willian').subscribe({
      next: result => console.log(result),
      error: err => console.log(err)
    }) */

    // const observer = {
    //   next: (result: string) => console.log('Next: ', result),
    //   error: (err: string) => console.log('Error: ', err),
    //   complete: () => console.log('FIM!')
    // }

    const observerUser = {
      next: (result: Usuario) => console.log('Next: ', result),
      error: (err: string) => console.log('Error: ', err),
      complete: () => console.log('FIM!')
    }

    // const obs = this.minhaObservable('Willian');

    // obs.subscribe(observer);

    /* const obsErr = this.minhaObservable('Willias');

    obsErr.subscribe(observer); */

    const obsUser = this.usuarioObservable('Admin', 'admin@admin.com');

    const subs = obsUser.subscribe(observerUser);

    setTimeout(() => {
      subs.unsubscribe();
    }, 3500);
  }

}

export class Usuario {

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  nome: string;
  email: string;
}
