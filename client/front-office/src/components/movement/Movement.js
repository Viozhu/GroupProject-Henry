import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import MovementsModal from './MovementsModal';
import MovementModalEdit from './MovementModalEdit';

export default function Movement() {
  // const getMov = {
  //   id: 1,
  //   amount: 85652,
  //   type: 'INCOME',
  //   generation_date: '2020-09-18T03:12:44.762Z',
  //   description: 'Home Loan Account',
  //   wallet: {
  //     id: 1,
  //     name: 'Savings Account',
  //     balance: 1205,
  //   },
  //   budget: 'withdrawal',
  // };

  // const putMov = {
  //   movement_id: 3,
  //   description: 'Fui updated 2', // opcional
  //   date: '20-12-2012 08:00:30', // opcional
  // };
  const movements = useSelector((state) => state.movementReducer.movements);
  const dispatch = useDispatch();
  // console.log(movements, 'aa');
  useEffect(() => {
    action.getMovements(dispatch);
  }, [dispatch]);

  return (
    <>
      <div className="card">
        <div className="bg-warning d-flex justify-content-between w-100 p-3 rounded-top">
          <h3>~ Register your expenses </h3>
          <MovementsModal />
        </div>

        <div className="card-body">
          <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
            <div className="row">
              <div className="col-sm-12 col-md-6" />
              <div className="col-sm-12 col-md-6" />
            </div>

            <div className="row">
              <div className="col-sm-12">
                <table
                  id="example2"
                  className="table table-bordered table-hover dataTable dtr-inline"
                  role="grid"
                  aria-describedby="example2_info"
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Rendering engine: activate to sort column ascending"
                      >
                        ID
                      </th>
                      <th
                        className="sorting sorting_desc"
                        aria-controls="example2"
                        aria-label="Browser: activate to sort column ascending"
                        aria-sort="descending"
                      >
                        Amount
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Platform(s): activate to sort column ascending"
                      >
                        Description
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Engine version: activate to sort column ascending"
                      >
                        Wallet
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="CSS grade: activate to sort column ascending"
                      >
                        Consume in Budget
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="CSS grade: activate to sort column ascending"
                      >
                        Date
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="CSS grade: activate to sort column ascending"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {movements &&
                    movements.map((x) => (
                      <>
                        <tbody>
                          <tr className="odd">
                            <td className="dtr-control">{x.id}</td>
                            <td className="sorting_1">$ {x.amount}.00</td>
                            <td>{x.description}</td>
                            <td>{x.wallet.name}</td>

                            <td>
                              <p className="text-center">{x.budget}</p>
                              <div className="progress progress-xs">
                                <div
                                  className="progress-bar bg-purple"
                                  style={{
                                    width: `${(30 / x.wallet.balance) * 100}%`,
                                  }}
                                />
                              </div>
                            </td>
                            <td>{x.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                            <td>
                              <MovementModalEdit
                                id={x.id}
                                description={x.description}
                                date={x.generation_date}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
