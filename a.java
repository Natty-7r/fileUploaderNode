package com.example.afterreset2;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//package deree;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 *
 * @author ZEDAILU
 */
public class HelloApplication extends Application {
    public int addresses[]=new int[100];
    int count;
    //public int tag,hit,miss,count,b,c,t2;
    @Override
    public void start(Stage primaryStage) {
        Scanner s=new Scanner(System.in);
        ComboBox cb=new ComboBox();

        cb.getItems().add("Direct mapping");
        cb.getItems().add("Full associative");
        cb.getItems().add("Set associative");
        Button summitBtn=new Button("Start");
        HBox root=new HBox();
        root.getChildren().addAll(cb,summitBtn);
        root.setSpacing(20);
        root.setAlignment(Pos.CENTER);

        //second scene
        Label lableBlockMemory=new Label("Block number of memory : ");
        TextField inputBlockMemory=new TextField();

        Label lableCacheLines=new Label("number of cache lines : ");
        TextField inputCachelines=new TextField();

        Label tl=new Label("number of tests : ");
        TextField tt= new TextField();

        Label ls=new Label("line of sets : ");
        TextField lt=new TextField();

        Label txa=new Label("Result : ");
        TextArea txarea=new TextArea();

        Label test=new Label("Enter value : ");
        TextField testf=new TextField();
        Button testb=new Button("submit");

        Button cal=new Button("calculate");
        Button back=new Button("Back");
        GridPane gp=new GridPane();
        gp.add(lableBlockMemory, 0, 0);
        gp.add(inputBlockMemory, 1,0 );
        gp.add(lableCacheLines, 0,1 );
        gp.add(inputCachelines, 1, 1);
        gp.add(tl, 0, 2);
        gp.add(tt, 1, 2);
        gp.add(test, 0, 3);
        gp.add(testf, 1, 3);
        gp.add(testb,2,3);
        gp.add(txa,0,4);
        gp.add(txarea,1,4);
        gp.add(cal,1,5);
        gp.add(back,2,5);
        gp.add(ls, 0, 6);
        gp.add(lt, 1, 6);
        gp.setAlignment(Pos.CENTER);
        gp.setVgap(10);
        Scene ms=new Scene(gp,700,500);
        Scene scene = new Scene(root, 400, 500);

        summitBtn.setOnAction(new EventHandler<ActionEvent>() {

            @Override
            public void handle(ActionEvent t) {

                primaryStage.setScene(ms);
                primaryStage.show();
            }
        });
        back.setOnAction(new EventHandler<ActionEvent>() {

            @Override
            public void handle(ActionEvent event) {

                primaryStage.setScene(scene);
                primaryStage.show();
            }
        });


        testb.setOnAction(new EventHandler<ActionEvent>() {

            @Override
            public void handle(ActionEvent event) {
                int check=Integer.parseInt(tt.getText());
                if(count<check)
                    addresses[count]=Integer.parseInt(testf.getText());
                testf.setText("");
                count++;
            }
        });

        cal.setOnAction(new EventHandler<ActionEvent>() {

            @Override
            public void handle(ActionEvent event) {
                String value=(String) cb.getValue();
                if(value=="Direct mapping"){
                    ls.setDisable(true);
                    lt.setDisable(true);
                    count=0;
                    int b=Integer.parseInt(inputBlockMemory.getText());
                    int c=Integer.parseInt(inputCachelines.getText());
                    int t2=Integer.parseInt(tt.getText());
                    int hit = 0;
                    int miss=0;
                    int tag = b/c;
                    int[] cashe = new int[c];
                    for(int i =0; i < c; i++)
                    {
                        cashe[i]=7058869;
                    }
                    for(int i=0;i<t2;i++){
                        int j;       // index of cashe
                        j = addresses[i] % c;
                        //for(int m=0; m<k; m++)
                        if(cashe[j] == addresses[i]) {
                            txarea.appendText("\n memory block of address :  "+addresses[i]+  " is already exist on cashe line "+ j);
                            hit++;
                        }
                        else {
                            cashe[j] = addresses[i];
                            txarea.appendText("\n memory block of address : "+addresses[i]+"  is mapped to cashe line "+ j);
                            miss++;
                        }
                    }
                    double hitratio, missratio;
                    hitratio = (double)hit/t2;
                    missratio = (double) miss/t2;

                    txarea.appendText("\nnumber of hit: "+ hit);
                    txarea.appendText("\n number of miss: "+ miss);
                    txarea.appendText("\nnumber of hit ratio: "+ hitratio );
                    txarea.appendText("\n number of miss ratio: "+missratio);

                }
                else if(value=="Full associative"){
                    ls.setDisable(true);
                    lt.setDisable(true);
                    count=0;
                    int me=Integer.parseInt(inputBlockMemory.getText());
                    int ca=Integer.parseInt(inputCachelines.getText());
                    int te=Integer.parseInt(tt.getText());

                    int [] incomingStream = new int[te];
                    int frames = ca;
                    for(int i = 0; i<te; i++)
                    {
                        incomingStream[i] = addresses[i];
                    }
                    int n = incomingStream.length;
                    HashSet s = new HashSet<>(frames);

                    // Queue created to store pages in FIFO manner
                    // since set will not store order or entry
                    // we will use queue to note order of entry of incoming page
                    Queue queue = new LinkedList<>();

                    int mis = 0;


                    for (int i=0; i < n; i++)
                    {
                        // if set has lesser item than frames
                        if (s.size() < frames)
                        {
                            // If incoming item is not present, add to set
                            if (!s.contains(incomingStream[i]))
                            {

                                s.add(incomingStream[i]);
                                mis++;

                                // Push the incoming page into the queue
                                queue.add(incomingStream[i]);

                                txarea.appendText("\n memory block of address :"+incomingStream[i]+" is mapped to cashe line "+ i);
                            }
                            else
                                txarea.appendText("\n memory block of address :"+incomingStream[i]+" is already exsit in cashe");
                        }

                        // If the set is full then we need to do page replacement
                        // in FIFO manner that is remove first item from both
                        // set and queue then insert incoming page
                        else
                        {
                            // If incoming item is not present
                            if (!s.contains(incomingStream[i]))
                            {
                                // remove the first page from the queue
                                int val;
                                val = (int) queue.peek();

                                // remove from queue
                                queue.poll();

                                // Remove from set
                                s.remove(val);

                                // insert incoming page to set
                                s.add(incomingStream[i]);

                                // push incoming page to queue
                                queue.add(incomingStream[i]);
                                mis++;
                                txarea.appendText("\n memory block of address :"+incomingStream[i]+" is mapped to cashe line "+ i);
                            }
                            else
                                txarea.appendText("\n memory block of address :"+incomingStream[i]+" is already exsit in cashe");
                        }

                    }
                    int hits = n - mis;
                    double hitsratio, misratio;
                    hitsratio = (double) hits/te;
                    misratio = (double)mis/te;
                    txarea.appendText("\nnumber of hit: "+ hits);
                    txarea.appendText("\n number of miss: "+ mis);
                    txarea.appendText("\nnumber of hit ratio: "+ hitsratio );
                    txarea.appendText("\n number of miss ratio: "+misratio);

                }
                else if(value=="Set associative"){
                    count=0;
                    int mem=Integer.parseInt(inputBlockMemory.getText());
                    int cas=Integer.parseInt(inputCachelines.getText());
                    int tes=Integer.parseInt(tt.getText());
                    int k=Integer.parseInt(lt.getText());
                    int set, misss=0,hitt=0,a=0,e=0;
                    set = cas/k;
                    int tag = mem/cas;
                    int[] cashes = new int[cas+set];
                    for(int i =0; i < cas; i++)
                    {
                        cashes[i]=705889;
                    }

                    for(int i= 0; i<tes; i++)
                    {
                        int address = addresses[i];
                        int j;       // index of cashe
                        j = address % set;
                        if(cashes[j] == address ^ cashes[j+set] == address)
                        {
                            txarea.appendText("\n memory block of address :"+address+" is already exist on cashe line "+ j);
                            hitt++;
                        }
                        else {

                            if(a==0) {
                                cashes[j] = address;
                                txarea.appendText("\n memory block of address : "+address+" is mapped to cashe line "+ j);
                            }
                            else
                            {
                                cashes[j+set] = address;
                                txarea.appendText("\n memory block of address : "+address+" is mapped to cashe line "+ (j+set));
                                a=0;
                            }

                            misss++;
                            if(e == j)
                                a++;
                            e=j;


                        }}

                    double hittratio, missrratio;
                    hittratio = (double) hitt/tes;
                    missrratio = (double)misss/tes;
                    //txarea.appendText("number bits in cashe: "+(double)Math.log(cas)+"\nnumber bit of tag: ");
                    txarea.appendText("\n number of hit: "+ hitt +"\n number of miss: "+misss);
                    txarea.appendText("\n number of hitratio: "+ hittratio +"\n number of missratio: "+missrratio);
                }
            }

        });



        primaryStage.setTitle("Cache mapping");
        primaryStage.setScene(scene);
        primaryStage.show();

    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }

}
