export const extractMovingData = (data) => {
  console.log('extractMovingData ' + JSON.stringify(data))
  const result =
    [
      {
        title: 'Basic Information',
        data: [
          {
            key: 'Submission Date',
            value: data.basic_information.submit_date,
          },
          {
            key: 'Status',
            value: data.basic_information.state,
          },
          {
            key: 'Check Number',
            value: data.basic_information.check_no,
          },
          {
            key: 'Moving Date',
            value: data.basic_information.moving_date,
          },
          {
            key: 'Moving Situation',
            value: data.basic_information.type,
          },
          {
            key: 'Unit No',
            value: data.basic_information.unit_no,
          }
          ,
          {
            key: 'Deposit',
            value: data.basic_information.deposit,
          }
        ]
      },
      {
        title: 'Owner Information',
        data: [
          {
            key: 'Email',
            value: data.owner_information.email,
          },
          {
            key: 'Name',
            value: data.owner_information.name,
          },
          {
            key: 'Mobile No',
            value: data.owner_information.mobile_no,
          }
        ]
      },
      {
        title: 'Mover Information',
        data: [
          {
            key: 'Mover Phone No',
            value: data.mover_information.mover_phno,
          },
          {
            key: 'Mover Name',
            value: data.mover_information.mover_name,
          }, {
            key: 'Vehicle Type',
            value: data.mover_information.vehicle_type,
          }, {
            key: 'Mover Email',
            value: data.mover_information.mover_email,
          },
        ]
      },
    ]

  console.log('extractMovingData result ' + JSON.stringify(result))
  return result
}

