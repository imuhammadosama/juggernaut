import './Business.css';
import Footer from '../components/Footer/Footer';
export default function () {
  return (
    <div>
      <div class='flex business-row border-bottom'>
        <div class='business-column-left center'>
          <h1>Load Board</h1>
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='businesses'>
        <div class='business-column-left center'>
          <h1>Businesses</h1>
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='carriers'>
        <div class='business-column-left center'>
          <h1>Carriers</h1>
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='brokers'>
        <div class='business-column-left center'>
          <h1>Brokers</h1>
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='load-tracking'>
        <div class='business-column-left center'>
          <h1>Load Tracking</h1>
          Our on – demand live - tracking provides real-time tracking and highly
          accurate delivery windows for your truckload shipments carrier
          integrations. This enables you to never miss out on critical updates
          including transit times, terminal updates, carrier appointment times
          and ETA.
          <br />
          <br />
          With live – tracking, managers have the ability to rapidly identify
          drivers who are not driving their vehicles in an effective manner. In
          addition, when drivers are aware that they are being closely
          monitored, they are more inclined to drive with better driving
          practices, obey guidelines, and take the routes that are the shortest
          distance between two points. Live tracking solutions improve customer
          support by reducing reaction times and boosting overall efficiency.{' '}
          <br />
          <br />
          For a firm with a fleet of vehicles, fuel is a major operating
          expense. Using real-time tracking, business owners may better control
          these costs by reducing idle time, optimising dispatching and routing,
          monitoring speed, and receiving an alert when maintenance is required
          on their fleet vehicles.
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='insurance'>
        <div class='business-column-left center'>
          <h1>Insurance</h1>
          Emergencies are unannounced and since trucks are being used to carry
          out commercial activities, any damage/loss caused to or by the truck
          can result in major financial losses. To avoid any monetary loss to
          your business, we offer the best third party – insurance policies.
          <br />
          <br />
          Payouts are faster and easier with zero involvement of the
          intermediary, any kind of claims are dealt directly between the
          business and the third – party. In case of any emergency, our clients
          can directly contact the support team of the insurer anytime for claim
          assistance. They work towards clearing all your queries and help you
          register the claim successfully.
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='fuel-card'>
        <div class='business-column-left center'>
          <h1>Fuel Card</h1>
          Juggernaut’s fuel card is used as a payment card most commonly for
          gasoline, diesel, and other fuels at gas stations. You may end up
          overspending on fuel if you pay drivers' expenses based on the number
          of miles they drive. If our fuel card is used, you'll always know
          exactly how much your company is spending on fuel and can avoid
          overspending.
          <br />
          <br />
          Juggernaut’s fuel card eliminates the need to keep a receipt for each
          transaction. All transactions conducted at the pumps will be recorded
          on invoices, which will be available to customers. You can request a
          printed copy of the weekly fuel invoice from your provider, which will
          be sent to you via email each week.
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>
      <div class='flex business-row border-bottom' id='dash-cam'>
        <div class='business-column-left center'>
          <h1>Dash Cam</h1>
          Our dash cam service can offer much more than just simple footage of a
          driver’s journey. With a plethora of features, dash cams give drivers
          an advantage in driver awareness and safety, and if combined with
          a radar detector, they create the ultimate driver alert system. <br />
          <br />
          Having a second set of eyes on the road through a dash cam recording
          can help prove fault in accidents and is a great way to make sure your
          insurance premiums don’t increase. Another great reason to have a dash
          cam is to be able to catch hit-and-run drivers. <br />
          <br />
          Insurance rates can change due to a number of factors, including age,
          commute distance, and driving record. Speeding tickets and accidents
          can cause your insurance rate to jump, sometimes to over triple what
          they were. In the event of an accident, having a dash cam that offers
          incident reports allows our clients to streamline the claims process
          for a faster experience and to prove that you weren’t at fault.
          <br />
          <br />
          Dash cams are not only a convenient device for providing you with
          peace of mind, they can help save you time and money in the event of
          an accident.
        </div>
        <div className='business-image'>
          <img src='https://i.imgur.com/PHhOla5.jpg' />
        </div>
      </div>

      <Footer />
    </div>
  );
}
