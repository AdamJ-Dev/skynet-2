package org.skynet.backend.services;

import com.amadeus.resources.FlightOfferSearch;
import lombok.Data;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FlightServiceTest {
//
//    @Autowired
//    private FlightService flightService;
//
//    @Data
//    public class TestFlightOffer extends FlightOfferSearch{
//        private Itinerary[] itineraries;
//        private SearchPrice price;
//
//        public TestFlightOffer(Itinerary[] itineraries){
//            super();
//            this.itineraries = itineraries;
//        }
//
//        public class TestSearchPrice extends SearchPrice {
//            private String total;
//            public TestSearchPrice(String total){
//                super();
//                this.total = total;
//            }
//        }
//
//        public class TestItinerary extends Itinerary{
//            private SearchSegment[] segments;
//
//            public TestItinerary(SearchSegment[] segments){
//                super();
//                this.segments = segments;
//            }
//
//            public class TestSegment extends SearchSegment{
//                private String duration;
//                private TestAirportInfo departure;
//                private TestAirportInfo arrival;
//
//                public TestSegment(String duration, TestAirportInfo departure, TestAirportInfo arrival){
//                    super();
//                    this.duration = duration;
//                    this.departure = departure;
//                    this.arrival = arrival;
//                }
//
//                public class TestAirportInfo extends AirportInfo {
//                    private String iataCode;
//                    private String at;
//
//                    public TestAirportInfo(String iataCode, String at){
//                        super();
//                        this.iataCode = iataCode;
//                        this.at = at;
//                    }
//                }
//
//            }
//        }
//    }
//
//    @Test
//    void testFlightSearchToDTO(){
////        TestFlightOffer.TestAirportInfo depature = new TestFlightOffer.TestAirportInfo("LHR","2023-08-12T08:45:00");
//
//        FlightOfferSearch[] flights = new FlightOfferSearch[]{
//                new TestFlightOffer(
//                        new TestFlightOffer.TestItinerary[]{
//                                new TestFlightOffer.TestItinerary.TestSegment("9H25M",
//                                        new TestFlightOffer.TestItinerary.TestSegment.TestAirportInfo("LHR","2023-08-12T08:45:00"),
//                                        new TestFlightOffer.TestItinerary.TestSegment.TestAirportInfo("MAD","2023-08-12T10:45:00"))},
//                        new TestFlightOffer.TestItinerary[]{
//
//                        });
//        }
//    }
}
