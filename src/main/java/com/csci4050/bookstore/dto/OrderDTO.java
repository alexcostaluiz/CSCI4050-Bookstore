package com.csci4050.bookstore.dto;
import java.time.LocalDate;
import com.csci4050.bookstore.model.Address;
import com.csci4050.bookstore.model.Card;
import com.csci4050.bookstore.model.Promotion;

public class OrderDTO {

    private Address address;
    private Card payment;
    private Promotion promo;
    private LocalDate orderDate;

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Card getPayment() {
        return this.payment;
    }

    public void setPayment(Card payment) {
        this.payment = payment;
    }

    public Promotion getPromo() {
        return this.promo;
    }

    public void setPromo(Promotion promo) {
        this.promo = promo;
    }

    public LocalDate getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }
}
