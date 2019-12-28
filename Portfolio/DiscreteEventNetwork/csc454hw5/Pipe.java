/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.csc454hw5;

/**
 *
 * @author ksslr
 * @param <T>
 */
public class Pipe<T> {
    T state;
    public Pipe(T s){
        state = s;
    }
    void delta(T input){
        state = input;
    }
    T lambda(){
        return state;
    }
}
