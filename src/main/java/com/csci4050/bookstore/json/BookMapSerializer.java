package com.csci4050.bookstore.json;

import java.io.IOException;
import java.io.StringWriter;

import com.csci4050.bookstore.model.Book;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

public class BookMapSerializer extends JsonSerializer<Book> {
 
    private ObjectMapper mapper = new ObjectMapper();
 
    @Override
    public void serialize(Book book, 
      JsonGenerator gen,
      SerializerProvider serializers) 
      throws IOException, JsonProcessingException {
 
        StringWriter writer = new StringWriter();
        mapper.writeValue(writer, book.getId());
        gen.writeFieldName(writer.toString());
    }
}
