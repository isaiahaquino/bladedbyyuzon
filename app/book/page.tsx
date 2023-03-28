export default function Book() {
  return (
    <div className='flex flex-col px-4 mt-10 text-grey'>
      <section className="text-center">
        <h1 className="text-3xl font-serif">Book an Appointment</h1>
      </section>

      <section>
        <form>
          <fieldset>
            <label htmlFor="service">Select a servie:</label>
            <select id="formService" name="service">
              
            </select>
          </fieldset>
        </form>
      </section>
    </div>
  )
}